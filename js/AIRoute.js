export const createRoute = (dataAnswer) => {
    let [
        age,
        education,
        experience,
        interest,
        learningStyle,
        goal,
        hoursPerWeek,
        mathInterest,
        workStyle
    ] = dataAnswer;
    const organizeVariables = () => {
        age = String(age.answer).split("Q1-")[1]
        education = String(education.answer).split("Q2-")[1]
        experience = String(experience.answer).split("Q3-")[1]
        hoursPerWeek = String(hoursPerWeek.answer).split("Q7-")[1]
        mathInterest = String(mathInterest.answer).split("Q8-")[1]
        let newInterest = [];
        interest.answer.forEach(element => {
            newInterest.push(String(element).split("Q4-")[1])
        });
        interest = newInterest;
        let newLearningStyle = [];
        learningStyle.answer.forEach(element => {
            newLearningStyle.push(String(element).split("Q5-")[1])
        });
        learningStyle = newLearningStyle;
        let newGoal = [];
        goal.answer.forEach(element => {
            newGoal.push(String(element).split("Q6-")[1])
        });
        goal = newGoal;
        let newWorkStyle = [];
        workStyle.answer.forEach(element => {
            newWorkStyle.push(String(element).split("Q9-")[1])
        });
        workStyle = newWorkStyle;
    }

    const setArea = (intrst) => {
        intrst.forEach(int => {
            switch (int) {
                case 'web':
                    setWebArea(mathInterest, goal, age)
                    break;
            }
        })
    }


    const setWebArea = (math, myGoal, myAge) => {
        if (math == 'no') {
            switch (myGoal) {
                case 'findjob':
                    if (myAge == 'teenager') {
                        setWebFindJobTeenagerLevel()
                    } else if (myAge == 'young') {
                        setWebFindJobYoungLevel()
                    } else if (myAge == 'middle') {
                        setWebFindJobMiddleLevel()
                    } else {
                        alert("سن شما اشتباه وارد شده است")
                        throw Error("سن شما اشتباه وارد شده است")
                    }
                    break;
                case 'immigration':
                    if (myAge == 'teenager') {
                        setWebimmigrationTeenagerLevel()
                    } else if (myAge == 'young') {
                        setWebimmigrationYoungLevel()
                    } else if (myAge == 'middle') {
                        setWebimmigrationMiddelLevel()
                    } else { }
                    break;
                case 'upgrade':
                    if (myAge == 'teenager') {

                    } else if (myAge == 'young') {

                    } else if (myAge == 'middle') {

                    } else { }
                    break;
                case 'project':
                    if (myAge == 'teenager') {

                    } else if (myAge == 'young') {

                    } else if (myAge == 'middle') {

                    } else { }
                    break;
                case 'startup':
                    if (myAge == 'teenager') {

                    } else if (myAge == 'young') {

                    } else if (myAge == 'middle') {

                    } else { }
                    break;
                case 'fun':
                    if (myAge == 'teenager') {

                    } else if (myAge == 'young') {

                    } else if (myAge == 'middle') {

                    } else { }
                    break;

            }
        } else if (math == 'little') {

        } else if (math == 'love') {

        } else { }
    }

    // Web Routes














































    const manageEngin = () => {
        setArea(interest, mathInterest)
        organizeVariables()
    }
    manageEngin()
}