import { useContext, useEffect, useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { QuestionnaireContext } from "../contexts/QuestionnaireContext.tsx";

const TextInputQuestion = ({ id, type }) => {
  const inputRef = useRef();
  const { updateAnswer, answers } = useContext(QuestionnaireContext);

  useEffect(() => {
    if (id && answers.length) {
      const answer = answers.find((answer) => answer.id === id);
      if (answer) {
        inputRef.current.value = answer.answerText || "";
      }
    }
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <TextField
        type={type}
        inputRef={inputRef}
        placeholder="# of Employees"
        sx={{ maxWidth: 250 }}
      />
      <Button
        onClick={() => updateAnswer({ id, answerText: inputRef.current.value })}
      >
        <ArrowForwardRoundedIcon />
      </Button>
    </Box>
  );
};

export default TextInputQuestion;
