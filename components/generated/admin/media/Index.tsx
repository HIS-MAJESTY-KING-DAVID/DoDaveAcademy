import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
<!DOCTYPE html>

<title>Media index</title>

{% block body %}
    <h1>Media index</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>VideoUrl</th>
                <th>Mp4File</th>
                <th>WebMFile</th>
                <th>OggFile</th>
                <th>ImageFile</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {media.map(medium => (

            <tr>
                <td>{medium.id}</td>
                <td>{medium.videoUrl}</td>
                <td>{medium.mp4File}</td>
                <td>{medium.webMFile}</td>
                <td>{medium.oggFile}</td>
                <td>{medium.imageFile}</td>
                <td>
                    <a href="{path('app_media_show', {'id': medium.id})}">show</a>
                    <a href="{path('app_media_edit', {'id': medium.id})}">edit</a>
                </td>
            </tr>
        
) || (

            <tr>
                <td colspan="7">no records found</td>
            </tr>
        
))}
        </tbody>
    </table>

    <a href="{path('app_media_new')}">Create new</a>
{% endblock %}

    </>
  );
}
