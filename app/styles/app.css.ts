import { style } from "@vanilla-extract/css";
import {vars} from './theme.css'


export const appStyle = style({
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(180deg, ${vars.color.bg_secondary} 0%, ${vars.color.bg_primary} 100%)`
})