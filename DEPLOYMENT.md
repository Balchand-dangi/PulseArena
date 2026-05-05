# PulseArena Deployment Checklist

## Backend

Set these environment variables on your backend hosting service. Do not upload the real `.env` file.

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
MONGODB_URL=mongodb+srv://username:password@cluster.example.mongodb.net/pulsearena
ADMIN_SECRET=replace_with_a_long_random_secret
ORGANIZER_SECRET=replace_with_a_long_random_secret
PARTICIPANT_SECRET=replace_with_a_long_random_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_FOLDER=PulseArena/tournaments
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
EMAIL_VERIFY_URL=https://your-backend-domain.com/organizer/verify-otp
```

Backend commands:

```bash
npm install
npm start
```

## Frontend

Set these variables before building the frontend.

```env
REACT_APP_API_BASE_URL=https://your-backend-domain.com
REACT_APP_REQUESTED_ADMIN_URL=https://your-backend-domain.com/admin
REACT_APP_REQUESTED_PARTICIPANT_URL=https://your-backend-domain.com/participant
REACT_APP_REQUESTED_ORGANIZER_URL=https://your-backend-domain.com/organizer
REACT_APP_REQUESTED_TOURNAMENT_URL=https://your-backend-domain.com/tournament
REACT_APP_REQUESTED_TICKET_URL=https://your-backend-domain.com/ticket
REACT_APP_TOURNAMENT_IMAGE_PATH=https://your-backend-domain.com/public
REACT_APP_PARTICIPANT_PATH=https://your-backend-domain.com/public
```

Frontend commands:

```bash
npm install
npm run build
```

After the frontend deploys, copy its final URL into backend `FRONTEND_URL`, then redeploy or restart the backend.
