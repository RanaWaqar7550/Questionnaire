import { Typography, Container, Dialog, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import successImg from "../assets/success.svg";

const WhiteContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  backgroundColor: "#fff",
  color: "#333",
  padding: theme.spacing(8, 5),
  overflowY: "auto",
  overflow: "hidden",
  borderRadius: theme.spacing(2),
}));

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: 20,
  right: 20,
});

const ThankYouModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <WhiteContainer>
        <CloseButton onClick={onClose}>
          <CloseIcon sx={{ color: "crm.colorAccent" }} />
        </CloseButton>
        <img src={successImg} alt="Success" width={200} height={200} />
        <Typography
          variant="h2"
          sx={{ fontWeight: 900, mt: { xs: 7, md: 10 } }}
        >
          Thank You!
        </Typography>
      </WhiteContainer>
    </Dialog>
  );
};

export default ThankYouModal;
