var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { name: 'Blue', length: '4:26' },
        { name: 'Green', length: '3:14' },
        { name: 'Red', length: '5:01' },
        { name: 'Pink', length: '3:21' },
        { name: 'Magenta', length: '2:15' }
    ]
};

var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { name: 'Hello, Operator?', length: '1:01' },
        { name: 'Ring, ring, ring', length: '5:01' },
        { name: 'Fits in your pocket', length: '3:21' },
        { name: 'Can you hear me now?', length: '3:14' },
        { name: 'Wrong phone number', length: '2:15' }
    ]
};

var albumJohn = {
    name: 'Born and Raised',
    artist: 'John Mayer',
    label: 'Columbia',
    year: '2012',
    albumArtUrl: 'assets/images/album_covers/16.png',
    songs: [
        { name: 'Queen of Califorina', length: '4:08' },
        { name: 'The Age of Worry', length: '2:39' },
        { name: 'Shadow Days', length: '3:50' },
        { name: 'Speak For Me', length: '3:45' },
        { name: 'Something Like Oliva', length: '3:01' }
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

    return template;
};

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
    albumTitle.firstChild.nodeValue = album.name;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    albumSongList.innerHTML = '';

    for (i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    }
};

var albumList = [albumPicasso, albumMarconi, albumJohn];
var albumIndex = 0;

window.onload = function() {
    setCurrentAlbum(albumPicasso);

    document.getElementsByClassName('album-cover-art')[0].addEventListener("click", function() {
				albumIndex++;
				if (albumIndex >= albumList.length) {
            albumIndex = 0;
        };
				setCurrentAlbum(albumList[albumIndex]);
    });
};
