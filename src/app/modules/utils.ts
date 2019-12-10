var VMasker = require('vanilla-masker')

export default class Utils {
  static cpfLength = 11;
  static cnpjLength = 14;

  static ListToTree(data, options?) {
    options = options || {};
    var ID_KEY = options.idKey || 'codFluxo';
    var PARENT_KEY = options.parentKey || 'totalizador';
    var CHILDREN_KEY = options.childrenKey || 'details';
    var NIVEL_KEY = options.nivelKey || 'nivel';
    var EXCLUDE = options.exclude || 'numNivelPai';

    var tree = [],
      childrenOf = {};
    var item, id, parentId;

    for (var i = 0, length = data.length; i < length; i++) {
      item = data[i];

      id = item[ID_KEY];

      parentId = item[PARENT_KEY] || 0;

      childrenOf[id] = childrenOf[id] || [];
      item[CHILDREN_KEY] = childrenOf[id];

      if (parentId != 0 && item[EXCLUDE] !== null) {
        var parentIndex = data.findIndex(d => d[ID_KEY] === parentId)

        if (i === 0 && parentIndex == -1) {
          tree.push(item)
        } else {
          parent = data[parentIndex]

          while (item[NIVEL_KEY] <= parent[NIVEL_KEY]) {
            parentId = parent[PARENT_KEY] || 0
            parentIndex = data.findIndex(d => d[ID_KEY] === parentId)
            parent = data[parentIndex]
          }

          childrenOf[parentId] = childrenOf[parentId] || [];
          childrenOf[parentId].push(item);
        }
      } else {
        tree.push(item);
      }
    };

    return tree;
  }

  static GetFilledValues<T>(value: T) {
    let body = new URLSearchParams
    Object.keys(value).forEach(v => {
      if ( value[v] === 'EMPTY' ) {
        body.set(v, '')
      } else if (value[v] !== '') {
        body.set(v, value[v])
      }
    });

    return body
  }

  static CompareElements(e1, e2) {
    Object.keys(e1).forEach( e => {
      if ( e1[e] !== e2[e] ) {
        return false
      }
    })

    return true
  }

  static ObjectToAray(object) {
    let result: string[] = []
    Object.keys(object).forEach(k => {
      result.push(object[k])
    })

    return result
  }

  static TestValue(value) {
    return ! ((value == null ) || 
      (value.hasOwnProperty('length') && value.length === 0 ) || 
      (value.constructor === Object && Object.keys(value).length === 0))
  }

  static FormatNumber(value: any, currencyCode: string = 'BRL', symbolDisplay: boolean = true, digits: boolean = true): any {
    if ( isNaN(value) ) {
      return value
    }
    let numValue: number = parseFloat(value)

    let result = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 
      currencyCode}).format(numValue);
    
    if ( digits == false ) {
      result = result.substring(0, result.length - 3)
    }
    return ( symbolDisplay ? result : result.replace('R$', ''))
  }

  static OnlyNumber(field: string) {
    return field.replace(/[_\W]+/g,'')
  }

  static IsCGCValid(cgc) {
    let _cgc = this.OnlyNumber(cgc)
    let result = this.validate(_cgc)
    return result == null
  }

  static IsCellphoneValid(phone) {
    return (/^\([1-9]\d\)\s9?\d{4}-\d{4}$/.test( Utils.Mask(phone.value, '(99) 99999-9999') ))
  }
  
  private static validate(c): any {
    const cpfCnpj = c.replace(/\D/g, '');
    if ([this.cpfLength, this.cnpjLength].indexOf(cpfCnpj.length) < 0) {
      return { length: true };
    }

    if (/^([0-9])\1*$/.test(cpfCnpj)) {
      return { equalDigits: true };
    }
    const cpfCnpjArr: number[] = cpfCnpj.split('').reverse().slice(2);
    cpfCnpjArr.unshift(this.buildDigit(cpfCnpjArr));
    cpfCnpjArr.unshift(this.buildDigit(cpfCnpjArr));

    if (cpfCnpj !== cpfCnpjArr.reverse().join('')) {
      return { digit: true };
    }

    return null
  }

  private static buildDigit(arr: number[]): number {
    const isCpf = arr.length < this.cpfLength;
    const digit = arr
      .map((val, idx) => val * ((!isCpf ? idx % 8 : idx) + 2))
      .reduce((total, current) => total + current) % this.cpfLength;
    if (digit < 2 && isCpf) {
      return 0;
    }
    return digit < 2 ? 0 : this.cpfLength - digit;
  }

  public static Mask(value, mask) {
    let text = this.OnlyNumber(value)
    let masked: string = VMasker.toPattern(text, mask)
    return masked
  }

  public static IsEmailValid(email: string) {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email.trim())
  }
}