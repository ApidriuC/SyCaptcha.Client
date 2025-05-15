import { SyCaptcha, SyCaptchaProvider } from '../sycaptcha';

function App() {
    return (
        <SyCaptchaProvider
            apiUrl='https://apispub.sycpruebas.com/API_SYCCAPTCHA'
            apiUserName='mi_usere'
            apiUserPassword='passwdsa'
            difficulty='Easy'
            expirationTime={5}
        >
            <div>
                <h1>Test SyCaptcha</h1>
                <SyCaptcha />
            </div>
        </SyCaptchaProvider>

    );
}

export default App;