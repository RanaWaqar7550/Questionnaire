import { useCallback, useContext, useEffect, useState } from "react";
import { Box, debounce, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { QuestionnaireContext } from "../contexts/QuestionnaireContext.tsx";

type PropTypes = {
  id: number;
  choices: string[];
};
const Choices = ({ id, choices }: PropTypes) => {
  const [selected, setSelected] = useState<string>("");

  const { updateAnswer, answers } = useContext(QuestionnaireContext);

  const debouncedChangeHandler = useCallback(
    debounce((id: number, choice: string) => {
      updateAnswer({ id, answerChoice: choice });
      setSelected("");
    }, 500),
    []
  );

  const submitAnswerHandler = (choice) => {
    setSelected(choice);
    debouncedChangeHandler(id, choice);
  };

  useEffect(() => {
    if (id && answers.length) {
      const answer = answers.find((answer) => answer.id === id);
      if (answer) {
        setSelected(answer.answerChoice || "");
      }
    }
  }, [id]);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {choices.map((choice) => (
        <Grid
          size={{ xs: 12, md: 6 }}
          key={choice}
          onClick={() => submitAnswerHandler(choice)}
        >
          <Box
            sx={{
              px: 3,
              py: { xs: 3, md: 4 },
              borderRadius: 1,
              cursor: "pointer",
              backgroundColor: selected === choice ? "lightgreen" : "#333",
              color: "white",
              "&:hover, &:focus": {
                backgroundColor: "lightgreen",
                color: "white",
              },
            }}
          >
            <Typography variant="h5">{choice}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Choices;
