const files = "**/*.{js,jsx,ts,tsx,scss}";

export default function getCommandsAndDefaultArgs(
  writeOrListDifferent: "write" | "list-different"
) {
  return {
    [writeOrListDifferent]: files
  };
}
