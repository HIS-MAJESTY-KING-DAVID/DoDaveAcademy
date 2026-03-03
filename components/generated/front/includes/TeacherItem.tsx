import React from 'react';
import Link from 'next/link';

export default function TeacherItem(props: any) {
  return (
    <>
<div className="member">
        <img src="{asset('front/img/trainers/trainer-1.jpg')}" className="img-fluid" alt="" />
        <div className="member-content">
            <h4>Walter White</h4>
            <span>Web Development</span>
            <p>
                Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut
            </p>
            <div className="social">
                <a href=""><i className="bi bi-twitter"></i></a>
                <a href=""><i className="bi bi-facebook"></i></a>
                <a href=""><i className="bi bi-instagram"></i></a>
                <a href=""><i className="bi bi-linkedin"></i></a>
            </div>
        </div>
    </div>
    </>
  );
}
