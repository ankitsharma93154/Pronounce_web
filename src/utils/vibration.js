export const vibrateCorrect = () => {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    try {
      navigator.vibrate(40);
    } catch (e) {
      // Ignore vibration errors
    }
  }
};

export const vibrateWrong = () => {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    try {
      navigator.vibrate([30, 40, 30]);
    } catch (e) {
      // Ignore vibration errors
    }
  }
};
