import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/sensedata/Layout.js";
import {
  Input,
  Textarea,
  Text,
  Button,
} from "@nextui-org/react";
import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import { useEffect, useState } from "react";

export default function SenderSms() {
  const [businessName, setBusinessName] = useState("");
  const [limitColor, setLimitColor] = useState("black")
  const [textInput, setTextInput] = useState("");
  const [message, setMessage] = useState("");
  const [textLimit, setTextLimit] = useState(false);

  function getTextInput(e) {
      setTextInput(e.target.value);
      setMessage(`${businessName.toUpperCase()}: ${e.target.value}`)
      setTextLimit(false);
  }

  function getBusinessName(e) {
      setBusinessName(e.target.value);
      setMessage(`${(e.target.value).toUpperCase()}: ${textInput}`)
      setTextLimit(false);
  }

  function verifyText() {
    console.log(message, message.length);
  }

  return (
    <InternalLayout>
      <Layout>
        <div className="flex gap-y-2 flex-col">
          <div className="flex gap-4 flex-row w-full">
            <div className="flex gap-y-2 flex-col w-full">
              <Input
                label="Nome da empresa"
                onChange={(e) => getBusinessName(e)}
              />
              <Textarea
                css={{ marginBottom: "10px" }}
                type="text"
                label="Messagem"
                onChange={(e) => getTextInput(e)}
                value={textInput}
              />
            </div>
            <div className="flex gap-y-2 flex-col w-full h-full">
              <Textarea
                css={{ marginBottom: "10px" }}
                readOnly
                fullWidth
                type="text"
                label="Pré-visualização"
                onChange={(e) => console.log(e.target.value)}
                value={message}
              />
            </div>
          </div>
          <Button onPress={verifyText}>verificar</Button>
          <div className="flex flex-col">
          <Text h3 color={message.length > 160 ? "error" : "black"}>Quantidade de caracteres: {message.length}
            / 160
          </Text>
          <Text h3 color={message.length > 160 ? "error" : "black"}>Quantidade de créditos: {Math.ceil(message.length / 160)}
          </Text>
          </div>
        </div>
      </Layout>
    </InternalLayout>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const token = cookies.authorization;
  try {
    verifyToken(token);
    const verifiedToken = verifyToken(token);
    return {
      props: { userData: verifiedToken },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
}
