import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchAddCommentToPost} from "../../redux/slices/comments";

export const Index = (props) => {
  const { imageUrl } = props
  const [text, setText] = React.useState('')
  const dispatch = useDispatch()
  const { id } = useParams()

  const onChange = (e) => {
    setText(e.target.value)
  }

  const submitComment = () => {
    dispatch(fetchAddCommentToPost({id, text}))
    setText('')
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={imageUrl}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={onChange}
          />
          <Button onClick={submitComment} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
