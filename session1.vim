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
badd +19 coderunner/views.py
badd +2 coderunner/urls.py
badd +5 AlgoZoo/views.py
badd +1 AlgoZoo/templates/root.html
badd +5 AlgoZoo/wsgi.py
badd +1 zoo/apps.py
badd +4 coderunner/apps.py
badd +1 AlgoZoo/__init__.py
badd +1 manage.py
badd +2 AlgoZoo/templates/root/home.html
badd +1 AlgoZoo/apps.py
badd +1 zoo/views.py
badd +8 coderunner/templates/test.html
badd +1 coderunner/templates/coderunner/test.html
badd +1 coderunner/admin.py
badd +5 coderunner/migrations/0001_initial.py
badd +19 coderunner/migrations/0002_auto_20190510_2332.py
badd +7 coderunner/fixtures/problems.yaml
badd +8 coderunner/models.py
badd +1 requirements.txt
badd +1 coderunner/static/problems/binarysearch.py
badd +1 coderunner/templates/coderunner/result.html
badd +1 static/tests/binarysearch_tests.py
badd +10 static/problems/binarysearch.py
badd +1 coderunner/static/tests/binarysearch_tests.py
badd +24 coderunner/static/tests/binarysearch_test.py
badd +21 term://.//55588:/bin/zsh
badd +4 zoo/templates/zoo/home.html
badd +154 term://.//58678:/bin/zsh
badd +0 NERD_tree_1
argglobal
silent! argdel *
edit coderunner/templates/coderunner/test.html
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 21 + 33) / 67)
exe 'vert 1resize ' . ((&columns * 120 + 181) / 362)
exe '2resize ' . ((&lines * 20 + 33) / 67)
exe 'vert 2resize ' . ((&columns * 120 + 181) / 362)
exe '3resize ' . ((&lines * 42 + 33) / 67)
exe 'vert 3resize ' . ((&columns * 120 + 181) / 362)
exe '4resize ' . ((&lines * 21 + 33) / 67)
exe 'vert 4resize ' . ((&columns * 120 + 181) / 362)
exe '5resize ' . ((&lines * 20 + 33) / 67)
exe 'vert 5resize ' . ((&columns * 120 + 181) / 362)
exe '6resize ' . ((&lines * 21 + 33) / 67)
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
let s:l = 48 - ((1 * winheight(0) + 10) / 21)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
48
normal! 028|
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
let s:l = 8 - ((1 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
8
normal! 0
wincmd w
argglobal
if bufexists("coderunner/views.py") | buffer coderunner/views.py | else | edit coderunner/views.py | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 2 - ((1 * winheight(0) + 21) / 42)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
2
normal! 021|
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
let s:l = 21 - ((20 * winheight(0) + 10) / 21)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
21
normal! 0
wincmd w
argglobal
if bufexists("coderunner/static/tests/binarysearch_test.py") | buffer coderunner/static/tests/binarysearch_test.py | else | edit coderunner/static/tests/binarysearch_test.py | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 8 - ((7 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
8
normal! 08|
wincmd w
argglobal
if bufexists("NERD_tree_2") | buffer NERD_tree_2 | else | edit NERD_tree_2 | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal nofen
silent! normal! zE
let s:l = 15 - ((14 * winheight(0) + 10) / 21)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
15
normal! 05|
lcd ~/Code_stuff/AlgoZoo
wincmd w
3wincmd w
exe '1resize ' . ((&lines * 21 + 33) / 67)
exe 'vert 1resize ' . ((&columns * 120 + 181) / 362)
exe '2resize ' . ((&lines * 20 + 33) / 67)
exe 'vert 2resize ' . ((&columns * 120 + 181) / 362)
exe '3resize ' . ((&lines * 42 + 33) / 67)
exe 'vert 3resize ' . ((&columns * 120 + 181) / 362)
exe '4resize ' . ((&lines * 21 + 33) / 67)
exe 'vert 4resize ' . ((&columns * 120 + 181) / 362)
exe '5resize ' . ((&lines * 20 + 33) / 67)
exe 'vert 5resize ' . ((&columns * 120 + 181) / 362)
exe '6resize ' . ((&lines * 21 + 33) / 67)
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
