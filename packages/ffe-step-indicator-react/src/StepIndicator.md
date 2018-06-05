Denne komponent viser en liste over stegene i en prosess, og indikerer
hvor langt brukeren har kommet i flyten.

```js
initialState = { currentStep: 2, furthestStep: 2 };
<div>
    <StepIndicator 
        steps={[
            {
                heading: 'Næring og formål', 
                description: 'Litt om hva dere skal låne til' 
            }, {
                heading: 'Regnskap', 
                description: 'Driftsinntekt, lønn, varer, utgifter og uregistrerte bevegelser',
            }, {
                heading: 'Oppsummering', 
                description: 'Se over og send inn',
            },
            ]} 
        currentStep={state.currentStep}
        furthestStep={state.furthestStep}
        onStepClick={step => {
            setState({ 
                        currentStep: step,
                        furthestStep: step > state.furthestStep ? step : state.furthestStep,
                    })
        }}
    />
    
    <PrimaryButton 
        onClick={() => {
            const step = state.currentStep + 1;
            setState({
                currentStep: step, 
                furthestStep: step > state.furthestStep ? step : state.furthestStep,
            })
        }}
    >
        Neste steg
    </PrimaryButton>
</div>
```
