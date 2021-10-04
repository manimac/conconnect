export class questionnaire {
  constructor(
    public QuestionID: string,
    public Question = {},
    public Answer: string 
  ) { }
}

export class questionAnswer {
  constructor( 
    public qA2: string,
    public qA3: string,
    public qA4: string,
    public qA5: string,
    public qA6: string,
    public qA7: string,

    public qA8: string,
    public qA9: string,
    public qA11: string,
    public qA12: string,
    public qA13: string,
    public qA14: string,
    public qA15: string,
    public qA16: string,
    public qA17: string,
    public qA18: string,


    public isqA12: string,
    public isqA17A: string,
    public isqA17B: string
  ) { }
}
