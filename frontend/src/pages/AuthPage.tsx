import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

interface SocketEvent {
  fn: string;
  status: string;
}

const linkDownloadPolygonIDWalletApp =
  "https://devs.polygonid.com/docs/wallet/wallet-sdk/polygonid-app#quick-start";

const AuthPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [verificationMessage, setVerificationMessage] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [qrCodeData, setQrCodeData] = useState<any>(null);
  const [isHandlingVerification, setIsHandlingVerification] = useState(false);
  const [verificationCheckComplete, setVerificationCheckComplete] =
    useState(false);
  // const [verificationMessage, setVerificationMessage] = useState("");
  const [socketEvents, setSocketEvents] = useState<SocketEvent[]>([]);

  let serverUrl: any, socket: any, getQrCodeApi: any;

  useEffect(() => {
    if (window) {
      serverUrl = window?.location?.href?.startsWith("https")
        ? "https://342a-105-163-1-117.ngrok-free.app"
        : "http://localhost:8080";

      getQrCodeApi = (sessionId: any) =>
        serverUrl + `/api/get-auth-qr?sessionId=${sessionId}`;

      socket = io(serverUrl);
    }
  });

  useEffect(() => {
    socket.on("connect", () => {
      setSessionId(socket.id);

      // only watch this session's events
      socket.on(socket.id, (arg: any) => {
        setSocketEvents((socketEvents) => [...socketEvents, arg]);
      });
    });
  }, []);

  useEffect(() => {
    const fetchQrCode = async () => {
      const response = await fetch(getQrCodeApi(sessionId));
      const data = await response.text();
      return JSON.parse(data);
    };

    if (sessionId) {
      fetchQrCode().then(setQrCodeData).catch(console.error);
    }
  }, [sessionId]);

  useEffect(() => {
    if (socketEvents.length) {
      const currentSocketEvent = socketEvents[socketEvents.length - 1];
      if (currentSocketEvent.fn === "handleVerification") {
        if (currentSocketEvent.status === "IN_PROGRESS") {
          setIsHandlingVerification(true);
        } else {
          setIsHandlingVerification(false);
          setVerificationCheckComplete(true);
          if (currentSocketEvent.status === "DONE") {
            setVerificationMessage("✅ Verified proof");
            setTimeout(() => {
              reportVerificationResult(true);
            }, 2000);
            socket.close();
          } else {
            setVerificationMessage("❌ Error verifying VC");
          }
        }
      }
    }
  }, [socketEvents]);

  const handleNavigate = () => {
    if (verificationMessage === "✅ Verified proof") {
      navigate("/home");
    }
  };

  // callback, send verification result back to app
  const reportVerificationResult = (result: any) => {
    // onVerificationResult(result);
  };

  function openInNewTab(url: any) {
    var win = window.open(url, "_blank");
    win?.focus();
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white w-full h-screen">
      {sessionId ? (
        <button
          className="px-4 py-2 bg-[#4acd8d] text-black rounded-md kanit-semibold"
          onClick={onOpen}
        >
          Prove access rights
        </button>
      ) : (
        <Spinner />
      )}

      {qrCodeData && (
        <div className="">
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay className="" />
            <ModalContent>
              <ModalHeader>
                <h1 className="text-black text-center kanit-regular mt-8 px-4">
                  {" "}
                  Scan this QR code from your{" "}
                  <a
                    href={linkDownloadPolygonIDWalletApp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Polygon ID Wallet App
                  </a>{" "}
                  to prove access rights
                </h1>
              </ModalHeader>
              <ModalCloseButton
                className="text-red-500"
                onClick={handleNavigate}
              />
              <ModalBody textAlign={"center"} fontSize={"12px"}>
                {isHandlingVerification && (
                  <div className="mt-4">
                    <p className="text-[#4acd8d] kanit-regular">
                      Authenticating...
                    </p>
                    <Spinner size={"xl"} colorScheme="purple" my={2} />
                  </div>
                )}
                <p className="text-black kanit-regular mt-4">
                  {" "}
                  {verificationMessage}
                </p>
                <p className="kanit-regular text-gray-500">
                  You can now close the modal and use BlockPesa🥳
                </p>
                {qrCodeData &&
                  !isHandlingVerification &&
                  !verificationCheckComplete && (
                    <Center marginBottom={1}>
                      <QRCode value={JSON.stringify(qrCodeData)} />
                    </Center>
                  )}

                {qrCodeData.body?.scope[0]?.query && (
                  <p className="text-black kanit-regular">
                    Type: {qrCodeData.body?.scope[0].query.type}
                  </p>
                )}

                {qrCodeData.body.message && <p>{qrCodeData.body.message}</p>}

                {qrCodeData.body.reason && (
                  <p className="text-gray-500">
                    Reason: {qrCodeData.body.reason}
                  </p>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
