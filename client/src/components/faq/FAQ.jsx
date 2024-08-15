import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQItem = ({ question, answer, id }) => {
    return (
      <Accordion key={id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>{question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  };

const FAQ = () => {
  const faqData = [
    {
      question: "What is the difference between generic and brand-name medications?",
      answer: "Generic medications are identical to their brand-name counterparts in dosage, strength, route of administration, quality, and intended use. The main difference between generic and brand-name medications is the price. Generic medications tend to be much cheaper than brand-name medications because they do not require the same level of marketing and research and development."
    },
    {
      question: "What is the recommended dosage for my medication?",
      answer: "The recommended dosage for your medication will depend on a variety of factors, including your age, weight, medical history, and the condition being treated. Always follow the dosage instructions provided by your healthcare provider or pharmacist. If you have any questions or concerns about your medication dosage, speak with your healthcare provider or pharmacist."
    },
    {
      question: "What should I do if I miss a dose of my medication?",
      answer: "If you miss a dose of your medication, take it as soon as you remember. However, if it is almost time for your next dose, skip the missed dose and continue with your regular dosing schedule. Do not take a double dose to make up for a missed dose. If you are unsure what to do if you miss a dose of your medication, speak with your healthcare provider or pharmacist."
    },
    {
      question: "What are the common side effects of my medication?",
      answer: "The common side effects of your medication will depend on the specific medication you are taking. Always read the medication information provided by your healthcare provider or pharmacist for a complete list of potential side effects. If you experience any severe or persistent side effects, speak with your healthcare provider or pharmacist immediately."
    },
    {
      question: "Can I drink alcohol while taking my medication?",
      answer: "Drinking alcohol while taking medication can be dangerous and is not recommended. Alcohol can interact with medications and cause unwanted side effects. Always check with your healthcare provider or pharmacist before drinking alcohol while taking medication."
    }
  ];

  return (
    <Container sx={{ marginTop: '100px' }}>
        <Typography variant="h2" align="center" gutterBottom>
            FAQ
        </Typography>
        <Container maxWidth="md">
            <Typography variant="h5" align="center" gutterBottom>
                Frequently Asked Questions
            </Typography>
            {faqData.map(({ question, answer }, index) => (
                <FAQItem question={question} answer={answer} id={index} />
            ))}
        </Container>
    </Container>
  );
};

export default FAQ;
