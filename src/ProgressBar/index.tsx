import { useContext } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

import { QuestionnaireContext } from "../contexts/QuestionnaireContext.tsx";

const ProgressBar = () => {
  const { answers, totalQuestionsLength } = useContext(QuestionnaireContext);

  const result = (answers.length / totalQuestionsLength) * 100;
  const progress = result > 100 ? 100 : result;

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography
        sx={{ display: "flex", justifyContent: "center" }}
        variant="h5"
      >
        Progress: {Math.floor(progress)}%
      </Typography>
      <Box sx={{ width: "100%", position: "relative", mt: 2 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          color="success"
          sx={{ height: 12, borderRadius: 2 }}
        />
      </Box>
    </Box>
  );
};

export default ProgressBar;
