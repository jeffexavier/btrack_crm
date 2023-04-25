import { Modal, useModal, Button, Text } from "@nextui-org/react";
import { useState } from "react";
import { setCookie, parseCookies } from "nookies"

export default function App() {
  const [ visible, setVisible ] = useState();
  const [customerNota, setCustomerNota] = useState({customer: "Boteco do jeffin", description: "testasdfasdfasdfasdfasdf", date: "2023-04-24"})

  setCookie(null, "testeCookie", "teste de adição de cookie", {
    maxAge: 60 * 60 * 1, // 1 hour
    path: '/'
  })

  return (
    <div>
      <Button auto shadow color="secondary" onPress={() => setVisible(true)}>
        Open modal
      </Button>
      <Modal
        scroll
        blur
        closeButton
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header aria-labelledby="modal-header">
          <Text size={18}>
            Modal with a lot of content
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>
          teste
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setVisible(false)}>
            Close
          </Button>
          <Button auto onPress={() => setVisible(false)}>
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);

  console.log('[cookies]', cookies, cookies.testeCookie);

  return {
    props: {
      msg: '[Server] Esse treco funcinou mesmo!',
      cookies: cookies
    }
  }
}