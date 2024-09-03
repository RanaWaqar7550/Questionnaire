import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Choices from "./Choices.tsx";
import TextInputQuestion from "./TextInputQuestion.tsx";
import ThankYouModal from "./ThankYouModal.tsx";
import Answers from "./Answers.tsx";
import { QuestionnaireContext } from "../contexts/QuestionnaireContext.tsx";

const Questionnaire = () => {
  const {
    currentQuestion,
    showThankYouModal,
    onCloseThankYouModal,
    onPreviousQuestion,
  } = useContext(QuestionnaireContext);

  const {
    id,
    question = "",
    textInputOptions = null,
    choicesOption = null,
  } = currentQuestion || {};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        color: "#333",
        flexGrow: 1,
        borderRadius: 1,
        p: { xs: 2, md: 5 },
        minHeight: 300,
        textAlign: "center",
      }}
    >
      {currentQuestion ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, md: 4 },
            width: "100%",
          }}
        >
          <Typography variant="h6">{question}</Typography>
          {textInputOptions && (
            <TextInputQuestion id={id} type={textInputOptions.type} />
          )}
          {choicesOption && <Choices id={id} choices={choicesOption.choices} />}
          <Box>
            {id > 1 && (
              <Button
                onClick={() => onPreviousQuestion(id)}
                variant="contained"
                size="large"
              >
                Back
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <CheckCircleIcon
            fontSize="large"
            color="success"
            sx={{ fontSize: 160 }}
          />
          <Typography variant="h3">
            Questionnaire completed successfully.
          </Typography>
          <Answers />
        </Box>
      )}
      <ThankYouModal open={showThankYouModal} onClose={onCloseThankYouModal} />
    </Box>
  );
};

export default Questionnaire;
