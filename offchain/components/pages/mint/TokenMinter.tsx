import { useState } from "react";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Json } from "@lucid-evolution/lucid";

import { useWallet } from "@/components/contexts/wallet/WalletContext";
import { mint } from "@/components/cs25";

export default function TokenMinter() {
  const [walletConnection] = useWallet();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  type Token = { name: string; image: string };
  const [token, setToken] = useState<Token>({ name: "", image: "" });
  const [isMinting, setIsMinting] = useState(false);

  return (
    <>
      <Form
        className="w-full min-w-[32rem] flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();

          const data = new FormData(e.currentTarget);
          const token: Json = Object.fromEntries(data);

          setToken(() => token);
          onOpen();
        }}
      >
        <Input
          isRequired
          errorMessage="Please enter the token name"
          label="Token Name"
          labelPlacement="outside"
          maxLength={32 - 4}
          name="name"
          placeholder="Enter the token name"
          type="text"
        />

        <Input
          isRequired
          defaultValue="https://c.tenor.com/eO5qGaj-eUkAAAAM/cardano-crypto.gif"
          errorMessage="Please enter the image URL"
          label="Image URL"
          labelPlacement="outside"
          maxLength={64}
          name="image"
          placeholder="https://www.example.com/image.jpg"
          type="url"
        />

        <div className="flex justify-center w-full gap-2">
          <Button color="primary" type="submit">
            Preview
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
      </Form>

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
                {token.name}
              </ModalHeader>
              <ModalBody className="items-center">
                <Image isBlurred isZoomed alt={token.name} src={token.image} />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  isDisabled={isMinting}
                  variant="light"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={isMinting}
                  onPress={async () => {
                    setIsMinting(() => true);
                    await mint(token, walletConnection);

                    onClose();
                    setIsMinting(() => false);
                  }}
                >
                  Mint
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
