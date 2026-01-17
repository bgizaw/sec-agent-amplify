import "./App.css";
import { Chat } from "./pages/chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { invokeLambda } from "./lambda/query-llms";
import { useState } from "react";

function App() {
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  let REQUIRE_QUOTE = `
  and provide a direct quote from the document you pulled this from. If you pulled the info from a table or anything 
  that isn't an easily quoteable body of text, then just explain where you got it from in as clear of a way as possible, 
  so the quote helps the user fully understand why the answer to their question is what it is.
  `;

  const handleQuery = async () => {
    setLoading(true);
    try {
      const result = await invokeLambda(
        "How much did Amazon invest in Anthropic in Q3 2023 and Q1 2024?" +
          REQUIRE_QUOTE,
        "AMZN",
        "2024"
      );
      setAnswer(result);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ThemeProvider>
      <Router>
        <div className="w-full h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
