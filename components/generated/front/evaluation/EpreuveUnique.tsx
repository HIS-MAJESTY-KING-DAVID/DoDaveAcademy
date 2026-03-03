import React from 'react';
import Link from 'next/link';

export default function EpreuveUnique(props: any) {
  return (
    <>
<form action="" method="POST">
    <div>
        {epreuve.map(question => (

            <div className="mb-3 border-dashed p-3">
                <input type="hidden" value="{question.id}" name="quizzes[{loop.index}][id]" />
                <div className="d-flex">
                    <h5 className="m-2">{loop.index}.</h5>
                    <h5 className="m-2">{question.question|raw}</h5>
                </div>
                {question.propositionJuste|length > 1 && (

                    <div className="text-info alert alert-info">{% trans %}MANY_ANSWERS_POSSIBLE_KEY{% endtrans %}</div>
                
)}
                <div>
                    <div>
                        <input className="btn-check btn-quiz-check" name="quizzes[{loop.index}][reponses][]" value="1" id="propsition1-{question.id}" type="{question.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}">
                        <label style="white-space: normal" className="btn btn-outline-primary w-100" for="propsition1-{question.id}">{question.proposition1|raw}</label>
                    </div>
                    <div>
                        <input className="btn-check btn-quiz-check" name="quizzes[{loop.index}][reponses][]" value="2" id="propsition2-{question.id}" type="{question.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}">
                        <label style="white-space: normal" className="btn btn-outline-primary w-100" for="propsition2-{question.id}">{question.proposition2|raw}</label>
                    </div>
                    <div>
                        <input className="btn-check btn-quiz-check" name="quizzes[{loop.index}][reponses][]" value="3" id="propsition3-{question.id}" type="{question.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}">
                        <label style="white-space: normal" className="btn btn-outline-primary w-100" for="propsition3-{question.id}">{question.proposition3|raw}</label>
                    </div>
                    <div>
                        <input className="btn-check btn-quiz-check" name="quizzes[{loop.index}][reponses][]" value="4" id="propsition4-{question.id}" type="{question.propositionJuste|length  /> 1 ? 'checkbox' : 'radio'}">
                        <label style="white-space: normal" className="btn btn-outline-primary w-100" for="propsition4-{question.id}">{question.proposition4|raw}</label>
                    </div>
                </div>
            </div>
            <hr />
        
))}
    </div>
    <div>
        <label>
            <input type="checkbox" required /> 
            
            Je suis sûre de vouloir soumettre c'est réponses
        </label>
        <input type="hidden" name="isSubmittedExamResponses" value="true" />
    </div>
    <div className="mt-5">
        <button type="submit" className="btn btn-success-soft">Envoyer les réponses</button>
    </div>
</form>
    </>
  );
}
