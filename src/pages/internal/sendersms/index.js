import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/sensedata/Layout.js";
import { Input, Textarea, Text, Button } from "@nextui-org/react";
import { parseCookies } from "nookies";
import { useState } from "react";

export default function SenderSms() {
  const [textLength, setTextLength] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [textLimit, setTextLimit] = useState(false);

  function putLimit(e) {
    if (e.target.value.length > 160) {
      setTextLimit(true);
    } else {
      setTextInput(e.target.value);
      setTextLength(e.target.value.length);
      setTextLimit(false);
    }
  }

  function verifyText() {
    console.log(textInput, textInput.length);
  }

  return (
    <InternalLayout>
      <Layout>
        <div className="flex-col justify-between w-full gap-2">
        <Input />
          <Textarea
            css={{ marginBottom: "10px" }}
            fullWidth
            type="text"
            label="ID"
            onChange={(e) => putLimit(e)}
            value={textInput}
          />
          <Button onPress={verifyText}>verificar</Button>

          <Text h3>{textLength} / 160</Text>
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
