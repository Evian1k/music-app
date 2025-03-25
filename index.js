async function searchSongs(query){
    const response= await
fetch(`https://saavn.dev/api/search/songs?query=${query}`);
    const data = await response.json();
    console.log(data);
}
searchSongs("She Will")