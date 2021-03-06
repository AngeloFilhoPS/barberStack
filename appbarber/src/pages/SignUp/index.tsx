import React, { useRef } from 'react';
import { Image, 
    KeyboardAvoidingView, 
    Platform, 
    View, 
    ScrollView,
    TextInput } from 'react-native'

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import {
    Container,
    Title,
    BackSignInButton,
    BackSignInButtonText
} from './styles';

import { create } from 'react-test-renderer';

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation()

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled>
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <Image source={logoImg} />
                        <View>
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form ref={formRef} onSubmit={(data) => {
                            console.log(data)
                        }}>
                            <Input
                                autoCapitalize='words'
                                name="name"
                                icon="user"
                                placeholder="Nome" 
                                returnKeyType='next'
                                onSubmitEditing={()=>{
                                    emailInputRef.current?.focus()
                                }}
                                />
                                
                            <Input
                                ref={emailInputRef}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType='next' 
                                onSubmitEditing={()=>{
                                    passwordInputRef.current?.focus()
                                }}
                                
                                />
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                textContentType='newPassword'
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                returnKeyType='send'
                                onSubmitEditing={() => { formRef.current?.submitForm() }} />

                        </Form>
                        <Button onPress={() => { formRef.current?.submitForm() }}>Cadastrar
                            </Button>
                    </ Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackSignInButton onPress={() => { navigation.navigate('SignIn') }}>
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackSignInButtonText>Voltar para o Logon</BackSignInButtonText>
            </BackSignInButton>
        </>

    );
}
export default SignIn