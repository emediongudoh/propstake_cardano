import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Form } from "@heroui/form";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
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
import { Json } from "@lucid-evolution/lucid";

import { useWallet } from "@/components/contexts/wallet/WalletContext";
import { queryAddressAssets, update } from "@/components/cs25";
import { handleError } from "@/components/utils";
import { Token } from "@/types/token";
import { EditIcon } from "@/components/icons";

export default function TokenUpdater() {
  const [walletConnection] = useWallet();
  const { address } = walletConnection;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [tokens, setTokens] = useState<Token[]>();
  const [selectedToken, setSelectedToken] = useState<Token>();
  const [isUpdating, setIsUpdating] = useState(false);

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
              <EditIcon className="text-green-500 shrink-0 group-hover:scale-125 transition-transform ease-linear" />
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
          size="lg"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <Form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const data = new FormData(e.currentTarget);
                  const updatedToken: Json = Object.fromEntries(data);

                  setIsUpdating(() => true);
                  const newToken = await update(
                    { ...selectedToken, ...updatedToken },
                    walletConnection,
                  );

                  if (newToken) {
                    setTokens((tokens) => {
                      return tokens?.map((token) => {
                        return token.assetName === selectedToken.assetName
                          ? newToken
                          : token;
                      });
                    });
                  }

                  onClose();
                  setIsUpdating(() => false);
                }}
              >
                <ModalHeader className="flex flex-col gap-1 w-full text-center">
                  Update NFT
                </ModalHeader>
                <ModalBody className="w-full min-w-[32rem] flex flex-col gap-4">
                  <Input
                    isRequired
                    defaultValue={selectedToken.name}
                    errorMessage="Please enter the new token name"
                    isReadOnly={isUpdating}
                    label="New Token Name"
                    labelPlacement="outside"
                    maxLength={32 - 4}
                    name="name"
                    placeholder="Enter the new token name"
                    type="text"
                  />

                  <Input
                    isRequired
                    defaultValue={selectedToken.image}
                    errorMessage="Please enter the new image URL"
                    isReadOnly={isUpdating}
                    label="New Image URL"
                    labelPlacement="outside"
                    maxLength={64}
                    name="image"
                    placeholder="https://www.example.com/image.jpg"
                    type="url"
                  />
                </ModalBody>
                <ModalFooter className="w-full">
                  <Button
                    color="danger"
                    isDisabled={isUpdating}
                    variant="light"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" isLoading={isUpdating} type="submit">
                    Update
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
