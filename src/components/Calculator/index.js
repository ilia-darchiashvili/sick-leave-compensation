import React, { useEffect, useState } from 'react';
import { validQuantity, roundNumbers, stringifyNumbers } from '../../utils/helpers';
import './index.scss';

const employerDayAfter = 3;
const employerDayTo = 8;
const insuranceDayAfter = 8;
const maxDays = 182;
const maxTuberculosisDays = 240;
const compensationRate = 0.7;

const Calculator = () => {
    const [ income, setIncome ] = useState();
    const [ leaveDays, setLeaveDays ] = useState();
    const [ hasTuberculosis, setHasTuberculosis ] = useState(false);
    const [ submittedIncome, setSubmittedIncome ] = useState();
    const [ submittedLeaveDays, setSubmittedLeaveDays ] = useState();
    const [ viewErrorMessage, setViewErrorMessage ] = useState();
    const [ employerDays, setEmployerDays] = useState(0);
    const [ insuranceDays, setInsuranceDays ] = useState(0);
    const [ employerCompensation, setEmployerCompensation ] = useState(0);
    const [ insuranceCompensation, setInsuranceCompensation ] = useState(0);
    const [ employerDailyCompensation, setEmployerDailyCompensation ] = useState(0);
    const [ insuranceDailyCompensation, setInsuranceDailyCompensation ] = useState(0);
    const [ dailyIncome, setDailyIncome ] = useState(0);
    const [ totalDays, setTotalDays ] = useState(0);
    const [ totalCompensation, setTotalCompensation ] = useState(0);

    const calculateCompensation = () => {
        if (income && leaveDays) {
            setViewErrorMessage(false);
            setSubmittedIncome(income);
            setSubmittedLeaveDays(leaveDays);
            setDailyIncome(roundNumbers(parseInt(income) / 30));

            if (parseInt(leaveDays) > employerDayTo) {
                setEmployerDays(employerDayTo - employerDayAfter);
                setInsuranceDays(parseInt(leaveDays) - insuranceDayAfter);

                if (hasTuberculosis) {
                    if (parseInt(leaveDays) - insuranceDayAfter > maxTuberculosisDays) {
                        setInsuranceDays(maxTuberculosisDays);
                        setSubmittedLeaveDays(maxTuberculosisDays);
                    }
                } else {
                    if (parseInt(leaveDays) - insuranceDayAfter > maxDays) {
                        setInsuranceDays(maxDays);
                        setSubmittedLeaveDays(maxDays);
                    }
                }

            } else if (parseInt(leaveDays) > employerDayAfter) {
                setEmployerDays(parseInt(leaveDays) - employerDayAfter);
                setInsuranceDays(0);
            } else {
                setEmployerDays(0);
                setInsuranceDays(0);
            }
            
        } else {
            setViewErrorMessage(true);
        }
    }

    useEffect(() => {
        if (submittedIncome && submittedLeaveDays && dailyIncome) {
            setEmployerCompensation(roundNumbers(roundNumbers(dailyIncome * compensationRate) * employerDays));
            setInsuranceCompensation(roundNumbers(roundNumbers(dailyIncome * compensationRate) * insuranceDays));
            
            if (employerCompensation) {
                setEmployerDailyCompensation(roundNumbers(dailyIncome * compensationRate));
            } else {
                setEmployerDailyCompensation(0);
            }

            if (insuranceCompensation) {
                setInsuranceDailyCompensation(roundNumbers(dailyIncome * compensationRate));
            } else {
                setInsuranceDailyCompensation(0);
            }
        }
    }, [submittedIncome, submittedLeaveDays, employerCompensation, insuranceCompensation]);

    useEffect(() => {
        setTotalDays(employerDays + insuranceDays);
    }, [employerDays, insuranceDays]);

    useEffect(() => {
        setTotalCompensation(roundNumbers(employerCompensation + insuranceCompensation));
    }, [employerCompensation, insuranceCompensation]);


    return (
        <div className='calculator-wrapper'>
            <h4 className='calculator-header'>Compensation Calculator</h4>
            <label className='input-label'>Average income</label>
            <input
                type='text'
                id='income'
                className='income'
                value={income}
                onChange={event => validQuantity(event.target.value, setIncome)}
            />
            <span className='input-inner-label label-euro'>€</span>
            <label className='input-label'>Days on sick-leave</label>
            <input
                type='text'
                id='leaveDays'
                className='leaveDays'
                value={leaveDays}
                onChange={event => validQuantity(event.target.value, setLeaveDays)}
            />
            <span className='input-inner-label label-days'>days</span>
            <div className='tuberculosis-info-wrapper'>
                <input
                    type='checkbox'
                    id='hasTuberculosis'
                    className='hasTuberculosis'
                    onChange={() => setHasTuberculosis(!hasTuberculosis)}
                />
                <label
                    className='input-label tuberculosis-label'
                    htmlFor='hasTuberculosis'
                >
                    I have tuberculosis
                </label>
            </div>
            <button
                onClick={() => calculateCompensation()}
                className='calculator-button'
            >
                Calculate
            </button>
            {viewErrorMessage && <label className='input-label error-label'>Please fill both input fields</label>}
            <div className='divider-line' />
            <div className='result-wrapper'>
                <div className='employer'>
                    <span className='title'>The employer compensates</span>
                    <div className='days'>{employerDays} days</div>
                    <div className='compensation'>{stringifyNumbers(employerCompensation)} €</div>
                    <span className='daily-title'>Daily allowance</span>
                    <div className='daily-compensation'>{stringifyNumbers(employerDailyCompensation)} €</div>
                </div>
                <div className='insurance'>
                    <span className='title'>Health Insurance compensates</span>
                    <div className='days'>{insuranceDays} days</div>
                    <div className='compensation'>{stringifyNumbers(insuranceCompensation)} €</div>
                    <span className='daily-title'>Daily allowance</span>
                    <div className='daily-compensation'>{stringifyNumbers(insuranceDailyCompensation)} €</div>
                </div>
            </div>
            <div className='divider-line' />
            <div className='final-result'>
                <span className='title'>Compensation total for {totalDays} days (net)</span>
                <div className='compensation'>{stringifyNumbers(totalCompensation)} €</div>
            </div>
        </div>
    );
}

export default Calculator;