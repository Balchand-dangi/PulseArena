const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

export const requestedAdminURL =
 process.env.REACT_APP_REQUESTED_ADMIN_URL || `${apiBaseURL}/admin`;

export const requestedParticipantURL =
  process.env.REACT_APP_REQUESTED_PARTICIPANT_URL || `${apiBaseURL}/participant`;

export const requestedOrganizerURL =
  process.env.REACT_APP_REQUESTED_ORGANIZER_URL || `${apiBaseURL}/organizer`;

export const requestedTournamentURL =
  process.env.REACT_APP_REQUESTED_TOURNAMENT_URL || `${apiBaseURL}/tournament`;

export const tournamentImagePath =
  process.env.REACT_APP_TOURNAMENT_IMAGE_PATH || `${apiBaseURL}/public`;

export const participantPath =
  process.env.REACT_APP_PARTICIPANT_PATH || `${apiBaseURL}/public`;
