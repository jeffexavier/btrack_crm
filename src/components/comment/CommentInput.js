import {  Collapse,  Input,  User,  Button,  Textarea,  Divider,} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import {  ArrowUturnLeftIcon,  ChatBubbleBottomCenterTextIcon,  PencilIcon,  TrashIcon,} from "@/public/icons.js";
import formatDateToLocaleString from "@/src/backend/utils/formatDateToLocalString.js";

export default function CommentInput({ comment }) {
  
  const [isEditable, setIsEditable] = useState(false)

  const commentRef = useRef();

  function getRef() {
    const itemRef = commentRef.current;
    itemRef.readOnly = !itemRef.readOnly;

    const parentRef =
      commentRef.current.parentElement.parentElement.parentElement.parentElement
        .style;
    parentRef.borderColor = "#17C964";

    if (parentRef.borderWidth === "0px" || parentRef.borderWidth === "") {
      parentRef.borderWidth = "2px";
    } else {
      parentRef.borderWidth = "0px";
    }
    console.log(
      commentRef.current.parentElement.parentElement.parentElement.parentElement
        .style.borderWidth
    );

  }

  return (
    <>
      <User
        bordered
        color="secondary"
        src="https://github.com/jeffexavier.png"
        name={comment.created_by.email}
      />
      <div className="flex justify-between gap-4 pr-4 ml-4 h-fit rounded-md shadow-md mb-6 mt-1">
        <Textarea
          minRows={1}
          ref={commentRef}
          color="secondary"
          bordered
          borderWeight="0"
          helperText={
            comment.dt_update
              ? `Editado em ${formatDateToLocaleString(comment.dt_update)}`
              : ""
          }
          maxRows={5}
          readOnly
          fullWidth
          aria-label="textarea"
          initialValue={comment.description}
        />
        <Button
          light
          auto
          color="secondary"
          iconRight={<ArrowUturnLeftIcon width="18px" />}
        ></Button>
        <Button
          light
          auto
          color="secondary"
          iconRight={<TrashIcon width="18px" />}
        ></Button>
        <Button
          light
          auto
          color="secondary"
          iconRight={<PencilIcon width="18px" />}
        ></Button>
        <Button light auto color="success" onPress={() => {getRef()}} iconRight={<PencilIcon width="18px" />}></Button>
        <Button light auto color="success" onPress={() => {getRef()}} iconRight={<PencilIcon width="18px" />}></Button>
      </div>
    </>
  );
}
