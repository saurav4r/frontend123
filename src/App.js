import React, { useState, useEffect } from 'react';
import {
  createTheme,
  ThemeProvider,
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Card,
  CardContent,
  Chip
} from '@mui/material';

import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4b88a2',   
    },
    secondary: {
      main: '#d7263d',   
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
  },
});

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');


  useEffect(() => {
    fetch(`${API_URL}/api/candidates`)
      .then((response) => response.json())
      .then((data) => setCandidates(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortOrder === 'asc') return a.yearsOfExperience - b.yearsOfExperience;
    if (sortOrder === 'desc') return b.yearsOfExperience - a.yearsOfExperience;
    return 0;
  });

  return (
    <ThemeProvider theme={theme}>
   
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)',
          py: 5,
        }}
      >
        <Container maxWidth="md">
        
          <Card
            sx={{
              mb: 4,
              boxShadow: 3,
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Candidate List Viewer
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Easily view, filter, and sort candidates based on their skills and years of experience.
              </Typography>
            </CardContent>
          </Card>

         
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            marginBottom={3}
          >
            <TextField
              fullWidth
              label="Search by name or skills"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSearchTerm('')}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Clear
            </Button>
          </Box>

     
          <Stack direction="row" spacing={2} marginBottom={3}>
            <Button
              variant={sortOrder === 'asc' ? 'contained' : 'outlined'}
              color="secondary"
              startIcon={<ArrowUpward />}
              onClick={() => setSortOrder('asc')}
            >
              Sort (Asc)
            </Button>
            <Button
              variant={sortOrder === 'desc' ? 'contained' : 'outlined'}
              color="secondary"
              startIcon={<ArrowDownward />}
              onClick={() => setSortOrder('desc')}
            >
              Sort (Desc)
            </Button>
          </Stack>

          <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
            <TableContainer>
              <Table>
               
                <TableHead
                  sx={{
                    backgroundColor: 'primary.main',
                    '& .MuiTableCell-head': {
                      color: 'white',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Skills</TableCell>
                    <TableCell>Years of Experience</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {sortedCandidates.map((candidate, index) => (
                    <TableRow
                      key={candidate.id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          backgroundColor: '#f0f0f0',
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>
                        {candidate.name}
                      </TableCell>
                      <TableCell>

                        {candidate.skills.split(',').map((skill, idx) => (
                          <Chip
                            key={idx}
                            label={skill.trim()}
                            color="secondary"
                            variant="outlined"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </TableCell>
                      <TableCell>{candidate.yearsOfExperience}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
