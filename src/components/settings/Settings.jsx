import { Paper, Typography, Switch, FormGroup, FormControlLabel, Divider, Box } from '@mui/material';

const Settings = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 4,
          background: 'linear-gradient(45deg, #9c27b0 30%, #3f51b5 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Settings
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="h6" gutterBottom>Preferences</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch />}
            label="Email Notifications"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="SMS Notifications"
          />
        </FormGroup>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Currency</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Show in USD"
          />
        </FormGroup>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Privacy</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Make profile public"
          />
          <FormControlLabel
            control={<Switch />}
            label="Share expense statistics"
          />
        </FormGroup>
      </Paper>
    </Box>
  );
};

export default Settings;