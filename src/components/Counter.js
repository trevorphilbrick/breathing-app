import { useState, useEffect } from "react";
import styled from "styled-components/native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { Pressable, Text, View } from "react-native";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const AnimatedContent = styled(Animated.View)`
  justify-content: center;
  align-items: center;
  border-radius: 300px;
  opacity: 0.9;
`;

const SmallText = styled.Text`
  font-size: 24px;
  color: #e2fffe;
  text-shadow: 0 1px 10px #000000;
`;

const SecondsText = styled(SmallText)`
  margin-bottom: 12px;
  text-shadow: 0 1px 10px #000000;
`;

const StepText = styled.Text`
  font-size: 32px;
  margin-bottom: 12px;
  color: #e2fffe;
  text-shadow: 2px 1px 10px #000000;
`;

const steps = ["breathe in", "hold", "breathe out", "hold"];

// TODO move the counter logic into a hook

const Counter = () => {
  const boxSize = useSharedValue(200);
  // State to track the elapsed seconds in the current breathing step (1 to 4).
  const [seconds, setSeconds] = useState(1);

  // Boolean to indicate if the counter is currently paused.
  const [isPaused, setIsPaused] = useState(false);

  // State to indicate the current breathing step index, based on the 'steps' array.
  const [step, setStep] = useState(0);

  // State to track how many full breathing rounds have been completed.
  const [completedRounds, setCompletedRounds] = useState(0);

  // Total number of rounds to complete before finishing.
  const totalRounds = 6;

  const handleRestart = () => {
    setStep(0);
    setSeconds(1);
    setIsPaused(true);
    setCompletedRounds(0);
  };

  // Effect to manage the breathing sequence
  useEffect(() => {
    // Stop when the total number of rounds is completed
    if (completedRounds === totalRounds) {
      setStep(0);
      setSeconds(0);
      setIsPaused(true);
      return;
    }

    // Exit the effect if the counter is paused
    if (isPaused) {
      return;
    }

    // Set a timeout to update the 'seconds' state after 500 milliseconds
    const timer = setTimeout(() => {
      // If 'seconds' reaches 4, reset 'seconds' and update the step
      if (seconds === 4) {
        setSeconds(1);
        setStep((prev) => (prev + 1) % 4);

        // If the current step is the last step of the round, increment completedRounds
        if (step === 3) {
          setCompletedRounds((prev) => prev + 1);
        }
        return;
      }

      // Otherwise, increment 'seconds'
      setSeconds((prev) => prev + 1);
    }, 1000);
  }, [seconds, isPaused]);

  useEffect(() => {
    if (completedRounds === totalRounds) {
      boxSize.value = withTiming(200, { duration: 4000 });
    } else if (step === 0) {
      boxSize.value = withTiming(300, { duration: 4000 });
    } else if (step === 2) {
      boxSize.value = withTiming(200, { duration: 4000 });
    }
  }, [step, completedRounds]);

  // Render the breathing counter
  return (
    <Container>
      <View style={{ height: 300, justifyContent: "center", marginBottom: 16 }}>
        <AnimatedContent style={{ width: boxSize, height: boxSize }}>
          {/* Display the current second count within the current step */}
          <SecondsText>{seconds}</SecondsText>

          {/* Display the current breathing instruction or 'finished' if the rounds are complete */}
          <StepText>
            {completedRounds === totalRounds ? "finished" : steps[step]}
          </StepText>

          {/* Display the count of completed rounds */}
          <SmallText>{`${completedRounds}/${totalRounds}`}</SmallText>
        </AnimatedContent>
      </View>
      <Pressable onPress={() => handleRestart()}>
        <Text style={{ textAlign: "center" }}>Restart</Text>
      </Pressable>
      <Pressable onPress={() => setIsPaused((prev) => !prev)}>
        <Text style={{ textAlign: "center" }}>
          {isPaused ? "Resume" : "Pause "}
        </Text>
      </Pressable>
    </Container>
  );
};

export default Counter;
