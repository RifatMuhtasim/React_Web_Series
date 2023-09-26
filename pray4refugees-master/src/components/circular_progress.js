import * as React from 'react';
import { Box, CircularProgress} from '@mui/material'


export const  ProgressBar = () =>  {

  return (
    <Box sx={{ backgroundColor: '#141e30', width: "100%", height: "100vh"}}>
      
      <div style={{ position: 'absolute', top: "50%", left: "50%", transform: 'translate(-50%, -50%)'}}>
        <Box >
          <div className="spinner-grow text-primary p-3" role="status">
            <span className="sr-only py-3"></span>
          </div> 
        </Box>

        <Box>
          <h4 className="text-secondary">Pray4Refugees.org</h4>
        </Box>

      </div>

    </Box>
  );
}