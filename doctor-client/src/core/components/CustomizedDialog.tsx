import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Box } from "@mui/system";
import { FormControl, FormHelperText, Typography } from "@mui/material";
export interface CustomTextFieldProps {
    onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: any) => void;
    name: string;
    label: string;
    error: string | undefined;
    touched: boolean | undefined;
    value: string | number | undefined | null;
    enable: boolean;
    nonEditable?: boolean;
    isRequired?: boolean;
    width?: number | string;
    multiline?: boolean;
    props?: TextFieldProps;
    sx?: {};
    dark?: boolean | undefined;
    maxLength?: number
}

const CustomTextField = ({
    onChange,
    onBlur,
    onFocus,
    name,
    label,
    error,
    touched,
    value,
    enable,
    nonEditable,
    isRequired = false,
    props,
    sx,
    dark,
    width,
    multiline,
    maxLength
}: CustomTextFieldProps) => {
    return (
        <Box>
            <FormControl
                required={isRequired}
                sx={{ width: { width }, maxWidth: "100%", color: !dark ? 'black' : 'white' }}
            >
                <Typography>
                    {label[0].toUpperCase() + label.slice(1)}
                </Typography>

                <TextField
                    type={props?.type ? props.type : "text"}
                    onFocus={onFocus}
                    placeholder={label[0].toUpperCase() + label.slice(1)}
                    disabled={nonEditable || !enable}
                    required={isRequired}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    value={value}
                    variant="outlined"
                    multiline={multiline} // Add the multiline prop
                    rows={5}
                    sx={{
                        boxShadow: "none",
                        color: nonEditable || !enable ? "#fff" : "#fff",
                        borderRadius: "5px",

                        ".MuiOutlinedInput-notchedOutline": {
                            border: !!(error && touched) ? "1px solid #FF5630" : 0,
                        },
                        "& .MuiOutlinedInput-root": {
                            maxWidth: "100%",
                            color: dark ? "#FFFFFF" : "#000",
                        },
                        margin: "0.3rem 0rem",
                        maxWidth: "100%",
                        ...sx,
                    }}
                    inputProps={{ maxLength: maxLength }}
                    {...props}
                />

                <FormHelperText
                    sx={{
                        color: "#FF5630",
                        paddingLeft: "1rem",
                    }}
                >
                    {error && touched ? error : ""}
                </FormHelperText>
            </FormControl>
        </Box>
    );
};

export default CustomTextField;
