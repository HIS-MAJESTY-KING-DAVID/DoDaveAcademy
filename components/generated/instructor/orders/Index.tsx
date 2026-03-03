import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends "instructor/base.html.twig" %}


{% block pageContent %}

    <!-- Card START -->
	<div className="card border bg-transparent rounded-3">
		<!-- Card header START -->
		<div className="card-header bg-transparent border-bottom">
			<h3 className="mb-0">Order List</h3>
		</div>
		<!-- Card header END -->

		<!-- Card body START -->
		<div className="card-body">

			<!-- Order list table START -->
			<div className="table-responsive border-0">
				<!-- Table START -->
				<table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
					<!-- Table head -->
					<thead>
						<tr>
							<th scope="col" className="border-0 rounded-start">Course name</th>
							<th scope="col" className="border-0">Order ID</th>
							<th scope="col" className="border-0">Date</th>
							<th scope="col" className="border-0">Amount</th>
							<th scope="col" className="border-0 rounded-end">Payment</th>
						</tr>
					</thead>

					<!-- Table body START -->
					<tbody>
						{orders.map(order => (

							<!-- Table item -->
							<tr>
								<!-- Table data -->
								<td>
									<h6 className="table-responsive-title mt-2 mt-lg-0 mb-0"><a href="#">{order.cours.intitule}</a></h6>
								</td>

								<!-- Table data -->
								<td className="text-center text-sm-start text-primary-hover">
									<a href="#" className="text-body"><u>#{order.reference}</u></a>
								</td>

								<!-- Table data -->
								<td>{order.paidAt|date('d/m/Y - H:i:s')}</td>

								<!-- Table data -->
								<td>{order.cours.montantAbonnement} XAF</td>

								<!-- Table data -->
								<td>{order.paymentMethod.label}</td>
							</tr>
						
) || (

							<tr><td colspan="5">No order's found</td></tr>
						
))}

					</tbody>
					<!-- Table body END -->
				</table>
				<!-- Table END -->
			</div>
			<!-- Order list table END -->

			<!-- Pagination START -->
			<div className="d-sm-flex justify-content-sm-between align-items-sm-center mt-4 mt-sm-3">
				<!-- Content -->
				<p className="mb-0 text-center text-sm-start">Showing {((orders.getCurrentPageNumber - 1) * orders.getItemNumberPerPage) + 1} to {orders.getItemNumberPerPage * orders.getCurrentPageNumber} of {orders.getTotalItemCount} entries</p>
				<!-- Pagination -->
				{knp_pagination_render(orders)}
			</div>
			<!-- Pagination END -->
		</div>
		<!-- Card body START -->
	</div>
	<!--Card END  -->

{% endblock %}
    </>
  );
}
