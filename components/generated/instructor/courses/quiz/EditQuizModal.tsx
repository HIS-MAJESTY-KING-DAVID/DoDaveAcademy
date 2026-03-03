import React from 'react';
import Link from 'next/link';

export default function EditQuizModal(props: any) {
  return (
    <>
<!-- Edit course modal START -->
<div className="modal fade" id="editQuestion{quiz.id}" tabindex="-1" aria-labelledby="editQuestionLabel" aria-hidden="true">
	<div className="modal-dialog">
		<form className="modal-content" method="post" action="{path('app_instructor_courses_quiz_edit', {reference: quiz.reference})}">
			<div className="modal-header bg-dark">
				<h5 className="modal-title text-white" id="editQuestionLabel">Edit Question</h5>
				<button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
			</div>
			<div className="modal-body">
				<div className="row text-start g-3">
                    
					<!-- Question -->
					<div className="col-12">
						<label className="form-label">Question</label>
						<input name="question" className="form-control" type="text" value="{quiz.question}" placeholder="Write a question" />
					</div>

					<!-- Answer options START -->
					<div className="col-6">
						<label className="form-label">Proposition 1</label>
						<input name="proposition1" className="form-control" type="text" value="{quiz.proposition1}" placeholder="Write a option" />
					</div>

					<div className="col-6">
						<label className="form-label">Option 2</label>
						<input name="proposition2" className="form-control" type="text" value="{quiz.proposition2}" placeholder="Write a option" />
					</div>

					<div className="col-6">
						<label className="form-label">Option 3</label>
						<input name="proposition3" className="form-control" type="text" value="{quiz.proposition3}" placeholder="Write a option" />
					</div>

					<div className="col-6">
						<label className="form-label">Option 4</label>
						<input name="proposition4" className="form-control" type="text" value="{quiz.proposition4}" placeholder="Write a option" />
					</div>

                    <div className="col-12">
						<label className="form-label">Proposition justes </label>
						<select name="propositionJuste" multiple className="form-control js-choice">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
					</div>
					<!-- Answer options END -->
				</div>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
				<button type="submit" className="btn btn-success my-0">Save change</button>
			</div>
		</form>
	</div>
</div>
<!-- Edit course modal START -->
    </>
  );
}
