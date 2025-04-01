use aiken/collection/list
use aiken/primitive/bytearray
use cardano/address.{Script}
use cardano/assets.{PolicyId}
use cardano/transaction.{InlineDatum, OutputReference, Transaction}
use cs25/action.{Action, Burn, Mint, Update}
use cs25/cip68.{Cip68}
use utils/value

validator cip_68 {
  mint(redeemer action: Action, policy_id: PolicyId, tx: Transaction) {
    let mint_qty =
      when action is {
        Mint { .. } -> 1
        Burn -> -1
        _ -> fail @"Invalid redeemer action!"
      }

    // must mint/burn exactly 2 tokens: ref_token & usr_token
    expect [ref_token, usr_token] = tx.mint |> value.to_pairs(policy_id)

    // must mint/burn ref_token, labelled:000643b0
    let Pair(ref_token_name, ref_token_qty) = ref_token
    expect ref_token_qty == mint_qty
    expect #"000643b0" = ref_token_name |> bytearray.take(4)

    // must mint/burn usr_token, labelled:000de140
    let Pair(usr_token_name, usr_token_qty) = usr_token
    expect usr_token_qty == mint_qty
    expect #"000de140" = usr_token_name |> bytearray.take(4)

    // usr_token must have the same name as the ref_token
    let token_name = usr_token_name |> bytearray.drop(4)
    expect token_name == bytearray.drop(ref_token_name, 4)

    when action is {
      Mint(nonce_utxo) -> and {
          token_name == ( nonce_utxo |> cbor.serialise |> crypto.blake2b_224 ),
          tx.inputs
            |> cip68.must_consume_nonce(nonce_utxo),
          tx.outputs
            |> cip68.must_send_ref_token_to_self_script(
                policy_id,
                ref_token_name,
              ),
        }
      Update { .. } -> False
      Burn -> True
    }
  }

  spend(
    _datum: Option<Cip68>,
    redeemer action: Action,
    o_ref: OutputReference,
    tx: Transaction,
  ) {
    expect Some(ref_token_input) = tx.inputs |> transaction.find_input(o_ref)
    expect Script(policy_id) = ref_token_input.output.address.payment_credential

    when action is {
      Mint { .. } -> False

      Update(usr_token_input_idx) -> {
        expect [Pair(ref_token_name, _)] =
          // extract the input ref_token AssetName by self PolicyID
          ref_token_input.output.value |> value.to_pairs(policy_id)
        let token_name = ref_token_name |> bytearray.drop(4)

        // must consume usr_token to proof ownership
        expect Some(usr_token_input) = list.at(tx.inputs, usr_token_input_idx)
        let tokens = usr_token_input.output.value |> value.to_pairs(policy_id)
        expect {
          let Pair(asset_name, _) <- list.any(tokens)
          and {
            asset_name != ref_token_name,
            bytearray.drop(asset_name, 4) == token_name,
          }
        }

        // must resend ref_token to update the metadatum
        expect [output] =
          tx.outputs |> transaction.find_script_outputs(policy_id)
        expect InlineDatum(metadata) = output.datum
        expect _: Cip68 = metadata
        expect [Pair(o_ref_token_name, _)] =
          // extract the output ref_token AssetName by self PolicyID
          output.value |> value.to_pairs(policy_id)
        and {
          o_ref_token_name == ref_token_name,
          // ☝🏻must resend ref_token with the same AssetName

          output.address == ref_token_input.output.address,
          // ☝🏻prevent insufficient-staking-control vulnerability:
          // https://library.mlabs.city/common-plutus-security-vulnerabilities#11.insufficientstakingkeycontrol

          output.reference_script == ref_token_input.output.reference_script,
        }
      }

      Burn ->
        // must execute self minting validation
        tx.mint
          |> assets.policies
          |> list.has(policy_id)
    }
  }

  else(_) {
    fail
  }
}
