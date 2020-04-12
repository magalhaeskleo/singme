import { makeStyles } from '@material-ui/core/styles';

export const stylePage = makeStyles(theme => ({
  logo: {
    marginTop: '150px',
    fontSize: '60px',
    color: '#eb7c0e'
  },

  button: {
    background: '#eb7c0e',
    marginTop: '5px',
    '&:hover': {
      backgroundColor: '#e8b90e'
    }
  },

  link: {
    color: '#eb7c0e',
    marginTop: '5px',
    textDecoration: 'none',
    '&:hover': {
      color: '#e8b90e',

      '&.Mui-focused fieldset': {
        borderColor: '#eb7c0e'
      }
    }
  },

  input: {
    background: 'white',
    borderRadius: '8px',
    marginTop: '5px',
    // quando o campo acabou de ser renderizado
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#eb7c0e'
      },
      //quando o mouse passa por cima do campo
      '&:hover fieldset': {
        borderColor: '#e8b90e'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#eb7c0e'
      }
    }
  },
  inputProfile: {
    borderRadius: '8px',
    marginTop: '5px',
    // quando o campo acabou de ser renderizado
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#eb7c0e'
      },
      //quando o mouse passa por cima do campo
      '&:hover fieldset': {
        borderColor: '#e8b90e'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#eb7c0e'
      }
    }
  }
}));
