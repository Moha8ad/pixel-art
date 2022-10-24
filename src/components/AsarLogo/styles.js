import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    asarLogoSm: {
        display: 'block',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    asarLogoLg: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
            cursor: 'pointer',
            margin: '10vh 0'

        },
    }
}));