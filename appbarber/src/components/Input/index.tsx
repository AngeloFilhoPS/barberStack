import React, {
    useState, 
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
    ForwardRefRenderFunction,
    useCallback
} from 'react';
import { Container, Icon, TextInput } from './styles';
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'
import { Value } from 'react-native-reanimated';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputeValueReference {
    value: string;
}

interface InputRef {
    focus(): void
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
    const inputElementRef = useRef<any>(null)
    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    const inputValueRef = useRef<InputeValueReference>({ value: defaultValue })

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    const handleInputFocus = useCallback(()=>{
        setIsFocused(true)
    },[])

    const handleInputBlur = useCallback(()=>{
        setIsFocused(false)
        setIsFilled((!!inputValueRef.current.value))
    },[])
    

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus()
        }
    }))
    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        })
    }, [fieldName, registerField])

    return (
        <Container isFocused={isFocused}>
            <Icon name={icon} size={20} color={isFocused?'#ff9000':'#666360'} />
            <TextInput
                ref={inputElementRef}
                keyboardAppearance='dark'
                defaultValue={defaultValue}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={(value) => {
                    inputValueRef.current.value = value
                }}
                placeholderTextColor="#666360" {...rest} />
        </Container>
    )
}

export default forwardRef(Input)