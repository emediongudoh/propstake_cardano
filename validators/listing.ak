use aiken/crypto.{Blake2b_224, Hash}
use aiken/collection/list
use cardano/script_context.{ScriptContext}
use aiken/crypto.{VerificationKey}
use cardano/transaction.{OutputReference}

pub type Property {
  owner: VerificationKey,
  price: Int,
  property_id: Hash<Blake2b_224, Blake2b_224>,
  is_listed: Bool,
}

pub type Action {
  List { price: Int }
  Delist
}

validator real_estate {
  spend(datum: Option<Property>, redeemer: Action, _reference: OutputReference, ctx: ScriptContext) -> Bool {
   expect Some(property) = datum
   
    when redeemer is {
      List { price } -> {
        // Only owner can list the property
        must_be_signed_by(ctx, property.owner) && 
        // Property must not be already listed
        !property.is_listed &&
        // Price must be positive
        price > 0
      }
      Delist -> {
        // Only owner can delist
        must_be_signed_by(ctx, property.owner) && 
        // Property must be listed
        property.is_listed
      }
    }
  }
}

fn must_be_signed_by(ctx: ScriptContext, vk: VerificationKey) -> Bool {
  list.has(ctx.transaction.extra_signatories, vk)
}