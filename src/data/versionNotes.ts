interface VersionNote {
  version: string;
  notes: string[
  {
    version: "0.0.3.4",
    notes: [
      "• Added automatic version notes",
      "• Version tooltip improvements",
      "• Better update tracking"
    ]
  },];
}

export const versionNotes: VersionNote[] = [
  {
    version: "0.0.3.3",
    notes: [
      "• Added version indicator",
      "• Auto-version from package.json",
      "• Added version update script"
    ]
  }
]; 