import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Catégories{% endblock %}

{% block actionBtn %}
	<a data-bs-toggle="modal" data-bs-target="#addCategoryModal" href="#" className="btn btn-sm btn-primary mb-0">Add category</a>
{% endblock %}

{% block script %}
    <script>
        const showEditModal = (e) => {
            const url = e.currentTarget.dataset.url;
            $.ajax({
                url: url,
                success: (response) => {
                    $('#editCategoryModal').html(response)
                    $('#editCategoryModal').modal('show')
                }
            })
        }

        document.querySelectorAll('.edit_category_btn').forEach(btn => { btn.addEventListener("click", showEditModal) });
        
    </script>
{% endblock %}

{% block mainContent %}

   <!-- Card START -->
	<div className="card bg-transparent border">

		<!-- Card header START -->
		<div className="card-header bg-light border-bottom">
			<!-- Search and select START -->
			<div className="row g-3 align-items-center justify-content-between">
				<!-- Search bar -->
				<div className="col-md-8">
					<form className="rounded position-relative" method="get">
						<input value="{search|default('')}" className="form-control bg-body" type="search" name="search" placeholder="Search" aria-label="Search" />
						<button className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
							<i className="fas fa-search fs-6 "></i>
						</button>
					</form>
				</div>
			</div>
			<!-- Search and select END -->
		</div>
		<!-- Card header END -->

		<!-- Card body START -->
		<div className="card-body">
			<!-- Course table START -->
			<div className="table-responsive border-0 rounded-3">
				<!-- Table START -->
				<table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
					<!-- Table head -->
					<thead>
						<tr>
							<th scope="col" className="border-0 rounded-start">Category Name</th>
							<th scope="col" className="border-0 text-center">SubCategories</th>
							<th scope="col" className="border-0 text-center">Courses</th>
							<th scope="col" className="border-0 text-center">Exams</th>
							<th scope="col" className="border-0 rounded-end text-center">Action</th>
						</tr>
					</thead>
					
					<!-- Table body START -->
					<tbody>
						{categories.map(category => (

							<tr>
								<!-- Table data -->
								<td>
									<div className="d-flex align-items-center position-relative">
										<!-- Image -->
										<div className="w-60px">
											<img src="{asset('uploads/media/courses/categories/' ~ category.imageFile)}" className="rounded" alt="" />
										</div>
										<!-- Title -->
										<h6 className="table-responsive-title mb-0 ms-2">	
											<a href="" className="stretched-link">{category.name}</a>
										</h6>
									</div>
								</td >
								<td className="text-center">{category.subCategories|length}</td>
								<!-- Table data -->
								<td className="text-center">{category.cours|length}</td>
								<td className="text-center">{category.exams|length}</td>
								<!-- Table data -->
								<td className="text-center">
									<a data-url="{path('app_admin_categorie_edit', {id: category.id})}" href="#" className="btn btn-sm btn-success-soft edit_with_modal_btn me-1 mb-1 mb-md-0">Edit</a>
                                    {include('admin/categorie/_delete_form.html.twig', {categorie: category})}
								</td>
							</tr>
						
) || (

							<tr><td colspan="7">No data found</td></tr>
						
))}
					</tbody>
					<!-- Table body END -->
				</table>
				<!-- Table END -->
			</div>
			<!-- Course table END -->
		</div>
		<!-- Card body END -->

		<!-- Card footer START -->
		<div className="card-footer bg-transparent pt-0">
			<!-- Pagination START -->
			<div className="d-sm-flex justify-content-sm-between align-items-sm-center">
				<p className="mb-0 text-center text-sm-start"></p>
				{knp_pagination_render(categories)}
			</div>
			<!-- Pagination END -->
		</div>
		<!-- Card footer END -->
	</div>
		<!-- Card END -->



        <!-- Popup modal for reviwe START -->
		<div className="modal fade" id="addCategoryModal" tabindex="-1" aria-labelledby="viewReviewLabel" aria-hidden="true">
			<div className="modal-dialog">
                {form_start(categoryForm)}
                    <div className="modal-content">
                        <!-- Modal header -->
                        <div className="modal-header bg-dark">
                            <h5 className="modal-title text-white" id="viewReviewLabel">Add Category</h5>
                            <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                        </div>
                        <!-- Modal body -->
                        <div className="modal-body g-3">
                            <div className="row g-4">
								<div className="col-12">
									{form_row(categoryForm.name)}
								</div>
								<div className="col-12">
                            		{form_row(categoryForm.isSubCategory)}
								</div>
								<div className="col-12">
									{form_row(categoryForm.category)}
								</div>
								<div className="col-12">
									{form_row(categoryForm.image)}
								</div>
							</div>
                        </div>
                        <!-- Modal footer -->
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-success-soft my-0">Add Category</button>
                        </div>
                    </div>
                {form_end(categoryForm)}
			</div>
		</div>
		<!-- Popup modal for reviwe END --> 

        <div className="modal fade" id="editCategoryModal" tabindex="-1" aria-labelledby="viewReviewLabel" aria-hidden="true">

        </div>

{% endblock %}

    </>
  );
}
