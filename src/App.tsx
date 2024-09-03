import { Box, Container } from "@mui/material";

import Layout from "./Layout.tsx";
import ProgressBar from "./ProgressBar";
import Questionnaire from "./Questionnaire";
import QuestionnaireContext from "./contexts/QuestionnaireContext.tsx";

import "./App.css";

function App() {
  return (
    <Layout>
      <QuestionnaireContext>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: { xs: 2, md: 4 },
            }}
          >
            <ProgressBar />
            <Questionnaire />
          </Box>
        </Container>
      </QuestionnaireContext>
    </Layout>
  );
}

export default App;
