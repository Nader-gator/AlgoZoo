let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Code_stuff/AlgoZoo
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +40 AlgoZoo/settings.py
badd +1 AlgoZoo/urls.py
badd +1 zoo/tests.py
badd +1 zoo/urls.py
badd +5 urls.py
badd +1 coderunner/templates/coderunner/home.html
badd +28 coderunner/views.py
badd +6 coderunner/urls.py
badd +5 AlgoZoo/views.py
badd +1 AlgoZoo/templates/root.html
badd +5 AlgoZoo/wsgi.py
badd +1 zoo/apps.py
badd +4 coderunner/apps.py
badd +1 AlgoZoo/__init__.py
badd +0 manage.py
badd +2 AlgoZoo/templates/root/home.html
badd +1 AlgoZoo/apps.py
badd +1 zoo/views.py
badd +8 coderunner/templates/test.html
badd +36 coderunner/templates/coderunner/test.html
badd +1 coderunner/admin.py
badd +5 coderunner/migrations/0001_initial.py
badd +19 coderunner/migrations/0002_auto_20190510_2332.py
badd +7 coderunner/fixtures/problems.yaml
badd +0 term://.//84960:/bin/zsh
badd +0 term://.//85548:/bin/zsh
badd +0 term://.//86154:/bin/zsh
badd +5 coderunner/models.py
badd +1 requirements.txt
badd +1 coderunner/static/problems/binarysearch.py
badd +0 coderunner/templates/coderunner/result.html
badd +0 static/tests/binarysearch_tests.py
badd +0 static/problems/binarysearch.py
argglobal
silent! argdel *
edit coderunner/views.py
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd w
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd w
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 31 + 181) / 362)
exe '2resize ' . ((&lines * 27 + 33) / 67)
exe 'vert 2resize ' . ((&columns * 82 + 181) / 362)
exe '3resize ' . ((&lines * 27 + 33) / 67)
exe 'vert 3resize ' . ((&columns * 81 + 181) / 362)
exe '4resize ' . ((&lines * 20 + 33) / 67)
exe 'vert 4resize ' . ((&columns * 164 + 181) / 362)
exe '5resize ' . ((&lines * 27 + 33) / 67)
exe 'vert 5resize ' . ((&columns * 82 + 181) / 362)
exe '6resize ' . ((&lines * 27 + 33) / 67)
exe 'vert 6resize ' . ((&columns * 82 + 181) / 362)
exe '7resize ' . ((&lines * 20 + 33) / 67)
exe 'vert 7resize ' . ((&columns * 82 + 181) / 362)
exe '8resize ' . ((&lines * 20 + 33) / 67)
exe 'vert 8resize ' . ((&columns * 82 + 181) / 362)
exe '9resize ' . ((&lines * 15 + 33) / 67)
exe 'vert 9resize ' . ((&columns * 109 + 181) / 362)
exe '10resize ' . ((&lines * 15 + 33) / 67)
exe 'vert 10resize ' . ((&columns * 110 + 181) / 362)
exe '11resize ' . ((&lines * 15 + 33) / 67)
exe 'vert 11resize ' . ((&columns * 109 + 181) / 362)
argglobal
enew
file NERD_tree_1
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal nofen
wincmd w
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 29 - ((24 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
29
normal! 05|
wincmd w
argglobal
if bufexists("coderunner/templates/coderunner/result.html") | buffer coderunner/templates/coderunner/result.html | else | edit coderunner/templates/coderunner/result.html | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 10 - ((8 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
10
normal! 07|
wincmd w
argglobal
if bufexists("coderunner/urls.py") | buffer coderunner/urls.py | else | edit coderunner/urls.py | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 7 - ((6 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
7
normal! 05|
wincmd w
argglobal
if bufexists("coderunner/templates/coderunner/test.html") | buffer coderunner/templates/coderunner/test.html | else | edit coderunner/templates/coderunner/test.html | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 36 - ((20 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
36
normal! 07|
wincmd w
argglobal
if bufexists("static/problems/binarysearch.py") | buffer static/problems/binarysearch.py | else | edit static/problems/binarysearch.py | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
wincmd w
argglobal
if bufexists("coderunner/templates/coderunner/home.html") | buffer coderunner/templates/coderunner/home.html | else | edit coderunner/templates/coderunner/home.html | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
wincmd w
argglobal
if bufexists("static/tests/binarysearch_tests.py") | buffer static/tests/binarysearch_tests.py | else | edit static/tests/binarysearch_tests.py | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 014|
wincmd w
argglobal
if bufexists("term://.//84960:/bin/zsh") | buffer term://.//84960:/bin/zsh | else | edit term://.//84960:/bin/zsh | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 276 - ((14 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
276
normal! 03|
wincmd w
argglobal
if bufexists("term://.//85548:/bin/zsh") | buffer term://.//85548:/bin/zsh | else | edit term://.//85548:/bin/zsh | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 21 - ((9 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
21
normal! 035|
wincmd w
argglobal
if bufexists("term://.//86154:/bin/zsh") | buffer term://.//86154:/bin/zsh | else | edit term://.//86154:/bin/zsh | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 2658 - ((14 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
2658
normal! 0
wincmd w
6wincmd w
exe 'vert 1resize ' . ((&columns * 31 + 181) / 362)
exe '2resize ' . ((&lines * 27 + 33) / 67)
exe 'vert 2resize ' . ((&columns * 82 + 181) / 362)
exe '3resize ' . ((&lines * 27 + 33) / 67)
exe 'vert 3resize ' . ((&columns * 81 + 181) / 362)
exe '4resize ' . ((&lines * 20 + 33) / 67)
exe 'vert 4resize ' . ((&columns * 164 + 181) / 362)
exe '5resize ' . ((&lines * 27 + 33) / 67)
exe 'vert 5resize ' . ((&columns * 82 + 181) / 362)
exe '6resize ' . ((&lines * 27 + 33) / 67)
exe 'vert 6resize ' . ((&columns * 82 + 181) / 362)
exe '7resize ' . ((&lines * 20 + 33) / 67)
exe 'vert 7resize ' . ((&columns * 82 + 181) / 362)
exe '8resize ' . ((&lines * 20 + 33) / 67)
exe 'vert 8resize ' . ((&columns * 82 + 181) / 362)
exe '9resize ' . ((&lines * 15 + 33) / 67)
exe 'vert 9resize ' . ((&columns * 109 + 181) / 362)
exe '10resize ' . ((&lines * 15 + 33) / 67)
exe 'vert 10resize ' . ((&columns * 110 + 181) / 362)
exe '11resize ' . ((&lines * 15 + 33) / 67)
exe 'vert 11resize ' . ((&columns * 109 + 181) / 362)
tabnext 1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOFI
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
