interface VersionNote {
  version: string;
  notes: string[
  {
    version: "0.0.3.6",
    notes: [
      "• Added Quick Tasks component",
      "• iOS-style task checkboxes",
      "• Smooth task completion animations"
    ]
  },
  {
    version: "0.0.3.5",
    notes: [
      "• Added version history tracking",
      "• Improved tooltip display",
      "• Smoother version updates"
    ]
  },];
}

export const versionNotes: VersionNote[] = [
  {
    version: "0.0.3.4",
    notes: [
      "• Added automatic version notes",
      "• Version tooltip improvements",
      "• Better update tracking"
    ]
  }
]; 