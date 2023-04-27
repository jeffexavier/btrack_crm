import { Modal, useModal, Button, Text, Input } from "@nextui-org/react";
import { useState } from "react";

export default function App() {
  const [ visible, setVisible ] = useState();
  return (
    <div>
      <Button auto shadow color="secondary" onPress={() => setVisible(true)}>
        Criar nova nota
      </Button>
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Criar nota de cliente
          </Text>
        </Modal.Header>
        <Modal.Body>
        <form>
          <Input placeholder="Cliente"/>
          <Button>teste</Button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setVisible(false)}>
            Cancelar
          </Button>
          <Button color="secondary" auto onPress={() => setVisible(false)}>
            Criar nota de cliente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
