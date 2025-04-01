import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Progress } from "@heroui/progress";

import { useWallet } from "@/components/contexts/wallet/WalletContext";
import { burn, queryAddressAssets } from "@/components/cs25";
import { handleError } from "@/components/utils";
import { Token } from "@/types/token";
import { DeleteIcon } from "@/components/icons";

export default function TokenBurner() {
  const [walletConnection] = useWallet();
  const { address } = walletConnection;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [tokens, setTokens] = useState<Token[]>();
  const [selectedToken, setSelectedToken] = useState<Token>();
  const [isBurning, setIsBurning] = useState(false);

  let isInit = false;

  useEffect(() => {
    if (!address) return;
    if (isInit) return;
    isInit = true;

    queryAddressAssets(walletConnection).then(setTokens).catch(handleError);
  }, [address]);

  if (!tokens)
    return (
      <div className="flex flex-col text-center gap-4 w-[32rem] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <span className="mt-8">Looking for known tokens in your wallet</span>
        <Progress isIndeterminate aria-label="Loading..." className="w-full" />
        <span className="mb-8">Please wait...</span>
      </div>
    );

  if (!tokens.length)
    return (
      <span className="my-2">
        No known token was found,&nbsp;
        <Chip as={Link} color="primary" href={"/mint"} variant="shadow">
          mint
        </Chip>
        &nbsp;a token instead?
      </span>
    );

  return (
    <>
      <div
        className={`flex flex-wrap gap-2 ${tokens.length === 1 ? "w-[140px]" : tokens.length === 2 ? "w-[288px]" : tokens.length === 3 ? "w-[436px]" : tokens.length === 4 ? "w-[584px]" : "w-[732px]"}`}
      >
        {tokens.map((token, t) => (
          <Card
            key={`token.${t}`}
            isPressable
            shadow="sm"
            onPress={() => {
              setSelectedToken(() => token);
              onOpen();
            }}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                isBlurred
                isZoomed
                alt={token.name}
                className="object-cover size-[140px]"
                radius="lg"
                shadow="sm"
                src={token.image}
                width="100%"
              />
            </CardBody>
            <CardFooter className="flex group text-small justify-between w-[140px]">
              <b className="text-ellipsis overflow-clip whitespace-nowrap min-w-0 shrink">
                {token.name}
              </b>
              <DeleteIcon className="text-red-500 shrink-0 group-hover:scale-125 transition-transform ease-linear" />
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedToken && (
        <Modal
          hideCloseButton
          isKeyboardDismissDisabled
          backdrop="blur"
          isDismissable={false}
          isOpen={isOpen}
          size="xs"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 w-full text-center">
                  {selectedToken.name}
                </ModalHeader>
                <ModalBody className="items-center">
                  <Image
                    isBlurred
                    isZoomed
                    alt={selectedToken.name}
                    src={selectedToken.image}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    isDisabled={isBurning}
                    variant="light"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    isLoading={isBurning}
                    onPress={async () => {
                      setIsBurning(() => true);
                      await burn(selectedToken, walletConnection);

                      setTokens((tokens) => {
                        return tokens?.filter(
                          ({ assetName }) =>
                            assetName !== selectedToken.assetName,
                        );
                      });

                      onClose();
                      setIsBurning(() => false);
                    }}
                  >
                    Burn
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
