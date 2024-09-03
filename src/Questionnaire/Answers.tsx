import { useContext } from "react";
import { Box, Typography } from "@mui/material";

import { QuestionnaireContext } from "../contexts/QuestionnaireContext.tsx";

const Answers = () => {
  const { getAnswers } = useContext(QuestionnaireContext);

  return (
    <>
      {getAnswers().map(({ id, question, answerChoice, answerText }) => (
        <Box
          key={id}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, md: 4 },
            width: "100%",
          }}
        >
          <Typography variant="h6">{question}</Typography>
          <Box>
            <Typography variant="body1">
              {answerChoice || answerText}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Answers;
