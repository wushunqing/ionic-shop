import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController ,App} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';
import { Validators } from "../../../validators/validators";
import { PersonService } from '../../../providers/person';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: any;

  loginErrors = {
    'mobileNum': '',
    'password': '',
  };
  validationMessages: any = {
    'password': {
      'required': "请输入密码"
    },
    'mobileNum': {
      'required': "请输入手机号码",
      'phone': "手机号码格式有误"
    },
    'phoneCode': {
      'required': "请输入手机验证码"
    },
    'userName': {
      'required': "请输入姓名"
    },
    'rePassword': {
      'required': "请再次输入密码"
    },
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public personService: PersonService,
    public storage: Storage,
    public appCtrl: App,
  ) {
  }

  ngOnInit() {
    this.initForm();

  }

  ionViewDidLoad() {
    console.log('login',this.navCtrl)
  }

  // 初始化表单控件
  initForm() {
    this.loginForm = this.formBuilder.group({
      mobileNum: ["", [Validators.required, Validators.phone]],
      password: ["", [Validators.required]]
    });
    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data, this.loginErrors));

  }

  //监控错误
  onValueChanged(data, formError) {

    for (const field in formError) {
      formError[field] = '';
      const control = this.loginForm.get(field);
      if (control && control.dirty && !control.valid) {//表单字段已修改或无效
        const messages = this.validationMessages[field];//取出对应字段可能的错误信息
        for (const key in control.errors) { //从errors里取出错误类型，再拼上该错误对应的信息
          messages[key] && (formError[field] += messages[key] + '');
        }
      }
    }

  }

  login() {
    if (this.loginForm.invalid) return;
    let params = {
      user_name: this.loginForm.controls['mobileNum'].value,
      password: this.loginForm.controls['password'].value
    }
    this.personService.login(params).subscribe(res => {
      if(res['code'] ==1){
        this.storage.set("userInfo", res['data']).then((res)=>{
          this.navCtrl.setRoot("TabsPage");
        });
      }else{
        this.navCtrl.setRoot("BusinessLicensePage",{'notLogin':1});
      }
      


    })

  }

  register() {
    this.navCtrl.push("RegisterPage");
  }

  findPassword() {
    this.navCtrl.push("FindPasswordPage");
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
