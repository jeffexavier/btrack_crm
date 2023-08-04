import { PlusCircleIcon } from "@/public/icons.js";
import { Card, Input, Text, Divider, Collapse, Link, Button } from "@nextui-org/react";

export default function ContactsList() {
  return (
    <>
      <Card variant="bordered">
        <Card.Header>
          <div className="flex justify-between min-w-full">
            <Text h4>Contatos</Text>
            <Button light auto color="secondary">
              <PlusCircleIcon width="20px" />
            </Button>
          </div>
        </Card.Header>
        <Divider />
        <Card.Body>
          <Link src="texte"/>
        </Card.Body>
      </Card>
    </>
  );
}
